
import fs from 'fs';
import { Command } from 'commander';
import { OpenAI } from 'openai';
import 'dotenv/config';
import styleFormat from './style_format.json';

const program = new Command();
program
  .name('ddd')
  .description('Generate JSON art style profile from an image')
  .requiredOption('-i, --image <path>', 'path to input image')
  .option('-k, --key <apiKey>', 'OpenAI API key; or use OPENAI_API_KEY env')
  .parse();

interface StyleProfile {
  art_style_profile: {
    style_name: string;
    visual_elements: Record<string, any>;
    purpose: string;
  };
}

async function run() {
  const opts = program.opts();
  const apiKey = opts.key || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('Error: OpenAI API key not provided.');
    process.exit(1);
  }
  const openai = new OpenAI({ apiKey });

  const imagePath = opts.image;
  if (!fs.existsSync(imagePath)) {
    console.error(`Error: File not found: ${imagePath}`);
    process.exit(1);
  } 
  const imageData = fs.readFileSync(imagePath).toString('base64');
  

  // Chat completion with vision input
  const res = await openai.responses.create({
    model: 'gpt-4o-mini',
    input: [{ 
      role: 'user', 
      content: [
        {
          type: 'input_text',
          text: '以下の画像を解析して、アートスタイルプロファイルをJSON形式で返してください。形式は例に厳密に従ってください。' 
        },
        // @ts-ignore
        { 
          type: 'input_image', 
          image_url: `data:image/png;base64,${imageData}` },
      ]},
      { role: 'user', content: JSON.stringify(styleFormat, null, 2) }
    ],
    temperature: 0.3
  });


  const text = res.output_text ?? '';
  let profile: StyleProfile;
  try {
    profile = JSON.parse(text);
  } catch (e) {
    console.error('Error: レスポンスの JSON パースに失敗しました。', e);
    console.log('Raw response:', text);
    process.exit(1);
  }

  console.log(JSON.stringify(profile, null, 2));
}

run().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});

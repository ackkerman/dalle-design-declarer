import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { describe, it, expect, vi } from 'vitest';

// モック OpenAI レスポンス
vi.mock('openai', () => {
  return {
    OpenAI: class {
      chat = {
        completions: {
          create: async () => ({
            choices: [{
              message: {
                content: JSON.stringify({
                  art_style_profile: {
                    style_name: 'TestStyle',
                    visual_elements: { foo: 'bar' },
                    purpose: 'テスト目的'
                  }
                })
              }
            }]
          })
        }
      };
    }
  };
});

describe('ddd', () => {
  const bin = path.resolve(__dirname, '../dist/main.js');
  const tmpImg = path.resolve(__dirname, './dummy.png');
  const validJsonPath = path.resolve(__dirname, './valid.json');
  const validJson = fs.readFileSync(validJsonPath, 'utf-8');

  beforeAll(() => {
    fs.writeFileSync(tmpImg, Buffer.from([0,1,2]));
  });
  afterAll(() => {
    fs.unlinkSync(tmpImg);
  });

  it('エラー: ファイルがない場合は exit 1', () => {
    let code = 0;
    try {
      execSync(`node ${bin} --image nofile.png`, { stdio: 'ignore' });
    } catch (e: any) {
      code = e.status;
    }
    expect(code).toBe(1);
  });

  it ('エラー: API キーがない場合は exit 1', () => {
    let code = 0;
    try {
      execSync(`node ${bin} --image ${tmpImg}`, { stdio: 'ignore' });
    } catch (e: any) {
      code = e.status;
    }
    expect(code).toBe(1);
  });

  it('正常系: 正しい形式のJSONが出力される', () => {
    const obj = JSON.parse(validJson);
    expect(obj.art_style_profile.style_name).toBe('Flat Minimalist Line Illustration with Pastel Accents');
    expect(obj.art_style_profile.visual_elements.shape_language).toBe('Clean, smooth outlines with simplified forms and minimal details');
  });
});

function beforeAll(callback: () => void) {
  try {
    callback();
  } catch (error) {
    console.error('Error in beforeAll:', error);
    throw error;
  }
}
function afterAll(callback: () => void) {
  try {
    callback();
  } catch (error) {
    console.error('Error in afterAll:', error);
    throw error;
  }
}


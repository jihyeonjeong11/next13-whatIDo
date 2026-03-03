import { execSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import * as dotenv from 'dotenv';

dotenv.config();


// Step 1: Get GitHub auth token — gh CLI 우선, 없으면 환경변수 fallback
function getAuthToken(): string {
  try {
    const token = execSync("gh auth token", { encoding: "utf-8" }).trim();
    if (token) {
      console.log("✓ gh CLI로 인증 확인");
      return token;
    }
  } catch {
    // gh not installed or not logged in
  }

  const envToken = process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN;
  if (envToken) {
    console.log("✓ 환경변수 토큰으로 인증 확인");
    return envToken;
  }

  console.error("인증 정보가 없습니다. 아래 중 하나를 선택하세요:");
  console.error(
    "  1. GitHub CLI 설치 후 로그인: winget install --id GitHub.cli && gh auth login"
  );
  console.error(
    "  2. GH_TOKEN 환경변수 설정 (https://github.com/settings/tokens)"
  );
  process.exit(1);
}

function parseInput(input: string): string {
  // https://github.com/owner/repo/blob/branch/path/to/file.md
  const urlMatch = input.match(
    /github\.com\/[^/]+\/[^/]+\/blob\/[^/]+\/(.+)/
  );
  if (urlMatch) return urlMatch[1];

  return input;
}

// Step 3: GitHub API로 파일 컨텐츠 fetch
async function fetchContent(
  filePath: string,
  token: string
): Promise<{ content: string; name: string; path: string }> {
  // 경로의 각 segment를 개별 encodeURIComponent (슬래시는 유지)
  const encodedPath = filePath
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");

  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodedPath}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!response.ok) {
    const error = (await response.json()) as { message: string };
    console.error(`GitHub API 오류 (${response.status}): ${error.message}`);
    process.exit(1);
  }

  const data = (await response.json()) as {
    content: string;
    name: string;
    path: string;
  };

  if (!data.content) {
    console.error("파일 컨텐츠를 찾을 수 없습니다.");
    process.exit(1);
  }

  // base64 디코딩
  const decoded = Buffer.from(data.content, "base64").toString("utf-8");
  return { content: decoded, name: data.name, path: data.path };
}

async function main() {
  const input = process.argv[2];

  if (!input) {
    console.error(
      "사용법: yarn obsidian-import <github-url 또는 경로>"
    );
    console.error(
      "예시:   yarn obsidian-import Literature/CheatSheets/Claude_code/claude_code_roadmap.md"
    );
    console.error(
      "예시:   yarn obsidian-import https://github.com/jihyeonjeong11/myobsidian/blob/main/notes/react.md"
    );
    process.exit(1);
  }

  const token = getAuthToken();

  const filePath = parseInput(input);

  const { content, name, path: remotePath } = await fetchContent(filePath, token);

  const tempDir = path.resolve("scripts/temp");
  fs.mkdirSync(tempDir, { recursive: true });
  const tempFile = path.join(tempDir, name);
  fs.writeFileSync(tempFile, content, "utf-8");

  console.log(`${name} 가 ${filePath}에 저장되었습니다.`)
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

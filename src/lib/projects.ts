import { CATEGORY_ORDER, PROJECTS } from "../data/projects";
import type { Project } from "../types";

/** start 내림차순. 값이 같으면 data/projects.ts 에 적힌 순서를 따릅니다.
 *  (자바스크립트 sort 는 순서가 보장되는 안정 정렬입니다) */
export const sortedProjects: Project[] = [...PROJECTS].sort((a, b) =>
  String(b.start ?? "").localeCompare(String(a.start ?? ""))
);

export function findProject(slug: string | undefined) {
  const index = sortedProjects.findIndex((p) => p.slug === slug);
  if (index === -1) return null;
  return {
    project: sortedProjects[index],
    newer: sortedProjects[index - 1] ?? null,
    older: sortedProjects[index + 1] ?? null,
  };
}

/** 분류 목록 (필터 버튼용). 프로젝트가 많은 분류부터 나옵니다.
 *  새 분류를 쓰면 버튼이 알아서 생깁니다. */
const counts = new Map<string, number>();
for (const p of sortedProjects) {
  for (const c of p.categories ?? []) {
    counts.set(c, (counts.get(c) ?? 0) + 1);
  }
}

export const categories: string[] = [
  "전체",
  // CATEGORY_ORDER 에 적힌 순서대로. 실제로 쓰이는 것만 버튼이 생깁니다.
  ...CATEGORY_ORDER.filter((c) => counts.has(c)),
  // 목록에 없는 새 분류는 뒤에 붙입니다.
  ...[...counts.keys()].filter((c) => !CATEGORY_ORDER.includes(c)).sort(),
];

export const categoryCounts = counts;

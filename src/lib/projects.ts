import { PROJECTS } from "../data/projects";
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

/** 회사 목록 (필터 버튼용) */
export const companies: string[] = [
  "전체",
  ...Array.from(new Set(sortedProjects.map((p) => p.company).filter(Boolean))),
];

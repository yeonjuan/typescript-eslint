import * as semver from 'semver';
import * as ts from 'typescript';

function semverCheck(version: string): boolean {
  return semver.satisfies(
    ts.version,
    `>= ${version}.0 || >= ${version}.1-rc || >= ${version}.0-beta`,
    {
      includePrerelease: true,
    },
  );
}

const versions = [
  '4.7',
  '4.8',
  '4.9',
  '5.0',
  '5.1',
  '5.2',
  '5.3',
  '5.4',
] as const;
type Versions = typeof versions extends ArrayLike<infer U> ? U : never;

export const typescriptVersionIsAtLeast = {} as Record<Versions, boolean>;
for (const version of versions) {
  typescriptVersionIsAtLeast[version] = semverCheck(version);
}

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v0.0.1-a2]

### Fixed

- Styling
- Replaced default vue favicon
- Deleted unused icons

## [v0.0.1-a1]

### Added

- Box fill calculator following the 2023 NFPA NEC
- One significant-figure output for box fill
- Basic, unstyled input for:
  - unit system (imperial, metric)
  - largest AWG
  - number of general conductors
  - presence of internal clamps
  - number of support fittings
  - devices (w/ input for AWG, number of gangs, deletion)
  - number of grounding conductors
  - terminal blocks (w/ input for AWG, deletion)
- Github actions workflow for running unit tests on pull request

[unreleased]: https://github.com/hoodnoah/boxfill_calculator/compare/v1.1.1...HEAD

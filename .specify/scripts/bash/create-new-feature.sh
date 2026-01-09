#!/bin/bash
# Mock script for creating new feature
# In a real environment, this would create the branch and spec file

FEATURE_DESC="$1"
FEATURE_NUMBER=$(echo "$2" | sed 's/--number=//')
FEATURE_NAME=$(echo "$3" | sed 's/--short-name=//')

# Create specs directory if it doesn't exist
mkdir -p specs

# Create feature directory
FEATURE_DIR="specs/${FEATURE_NUMBER}-${FEATURE_NAME}"
mkdir -p "$FEATURE_DIR"

# Create spec file
SPEC_FILE="$FEATURE_DIR/spec.md"
cat > "$SPEC_FILE" << EOF
# [SPEC_TITLE]
**Feature**: [FEATURE_SHORT_NAME]
**Number**: [FEATURE_NUMBER]

## Overview
[OVERVIEW]

## User Scenarios & Testing
[USER_SCENARIOS]

## Functional Requirements
[FUNCTIONAL_REQUIREMENTS]

## Non-Functional Requirements
[NON_FUNCTIONAL_REQUIREMENTS]

## Success Criteria
[SUCCESS_CRITERIA]

## Key Entities
[KEY_ENTITIES]

## Scope
[SCOPE]

## Assumptions
[ASSUMPTIONS]

## Dependencies
[DEPENDENCIES]

## Acceptance Criteria
[ACCEPTANCE_CRITERIA]
EOF

# Create branch (simulated)
BRANCH_NAME="${FEATURE_NUMBER}-${FEATURE_NAME}"
echo "Created branch: $BRANCH_NAME"
echo "Created spec file: $SPEC_FILE"

# Output JSON result
cat << EOF
{
  "BRANCH_NAME": "$BRANCH_NAME",
  "SPEC_FILE": "$SPEC_FILE",
  "FEATURE_DIR": "$FEATURE_DIR"
}
EOF
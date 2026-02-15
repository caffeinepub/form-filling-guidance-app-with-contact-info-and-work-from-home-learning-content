# Production Smoke Check Runbook

This document describes how to run post-deployment smoke checks to verify that the learning& Earning application is functioning correctly in production.

## Overview

The smoke check script verifies that all core application routes are accessible and returning valid HTTP responses after deployment.

## Checked Routes

The smoke check validates the following routes:
- `/` - Home page
- `/learn` - Learning content page
- `/guided-forms` - Guided form filling wizard
- `/contact` - Contact and support page

## Running the Smoke Check

### Command


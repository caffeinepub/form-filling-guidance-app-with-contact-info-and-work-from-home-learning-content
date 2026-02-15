#!/usr/bin/env node

/**
 * Post-Deploy Smoke Check
 * 
 * Verifies that core routes are accessible after deployment.
 * Usage: node frontend/scripts/postdeploy-smoke-check.mjs <base-url>
 * Example: node frontend/scripts/postdeploy-smoke-check.mjs https://your-app.ic0.app
 */

import https from 'https';
import http from 'http';

const ROUTES_TO_CHECK = [
  '/',
  '/learn',
  '/guided-forms',
  '/contact'
];

const TIMEOUT_MS = 10000;

function checkRoute(baseUrl, route) {
  return new Promise((resolve, reject) => {
    const url = new URL(route, baseUrl);
    const protocol = url.protocol === 'https:' ? https : http;
    
    const req = protocol.get(url.toString(), { timeout: TIMEOUT_MS }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          // Check if response looks like HTML
          const isHtml = data.includes('<!DOCTYPE html') || data.includes('<html');
          resolve({
            route,
            status: res.statusCode,
            success: true,
            isHtml,
            size: data.length
          });
        } else {
          resolve({
            route,
            status: res.statusCode,
            success: false,
            error: `HTTP ${res.statusCode}`
          });
        }
      });
    });
    
    req.on('error', (error) => {
      resolve({
        route,
        success: false,
        error: error.message
      });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({
        route,
        success: false,
        error: 'Request timeout'
      });
    });
  });
}

async function runSmokeCheck(baseUrl) {
  console.log('🔍 Starting post-deploy smoke check...');
  console.log(`📍 Base URL: ${baseUrl}\n`);
  
  const results = [];
  
  for (const route of ROUTES_TO_CHECK) {
    process.stdout.write(`Checking ${route}... `);
    const result = await checkRoute(baseUrl, route);
    results.push(result);
    
    if (result.success) {
      console.log(`✅ OK (${result.status}, ${result.size} bytes, ${result.isHtml ? 'HTML' : 'non-HTML'})`);
    } else {
      console.log(`❌ FAILED (${result.error})`);
    }
  }
  
  console.log('\n📊 Summary:');
  const passed = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`✅ Passed: ${passed}/${results.length}`);
  console.log(`❌ Failed: ${failed}/${results.length}`);
  
  if (failed > 0) {
    console.log('\n❌ Smoke check FAILED');
    console.log('Failed routes:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.route}: ${r.error}`);
    });
    process.exit(1);
  } else {
    console.log('\n✅ All smoke checks passed!');
    process.exit(0);
  }
}

// Main execution
const baseUrl = process.argv[2];

if (!baseUrl) {
  console.error('❌ Error: Base URL is required');
  console.error('Usage: node frontend/scripts/postdeploy-smoke-check.mjs <base-url>');
  console.error('Example: node frontend/scripts/postdeploy-smoke-check.mjs https://your-app.ic0.app');
  process.exit(1);
}

runSmokeCheck(baseUrl).catch(error => {
  console.error('❌ Smoke check failed with error:', error);
  process.exit(1);
});

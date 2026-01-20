import { validateUrl, validateSlug } from "../utils/validators.js";

/**
 * Simple test runner for validators
 * Run with: node tests/validators.test.js
 */

let testCount = 0;
let passedCount = 0;

function assert(condition, message) {
	testCount++;
	if (condition) {
		passedCount++;
		console.log(`✓ ${message}`);
	} else {
		console.log(`✗ ${message}`);
	}
}

console.log("=== Testing URL Validator ===\n");

// Test valid URLs
assert(
	validateUrl("https://www.google.com").isValid === true,
	"Should validate a valid HTTPS URL"
);

assert(
	validateUrl("http://example.com").isValid === true,
	"Should validate a valid HTTP URL"
);

// Test invalid URLs
assert(
	validateUrl("not-a-url").isValid === false,
	"Should reject invalid URL format"
);

assert(
	validateUrl("").isValid === false,
	"Should reject empty string"
);

assert(
	validateUrl(null).isValid === false,
	"Should reject null"
);

assert(
	validateUrl("   ").isValid === false,
	"Should reject whitespace-only string"
);

console.log("\n=== Testing Slug Validator ===\n");

// Test valid slugs
assert(
	validateSlug("abc123").isValid === true,
	"Should validate a valid slug"
);

// Test invalid slugs
assert(
	validateSlug("").isValid === false,
	"Should reject empty slug"
);

assert(
	validateSlug(null).isValid === false,
	"Should reject null slug"
);

assert(
	validateSlug("   ").isValid === false,
	"Should reject whitespace-only slug"
);

console.log(`\n=== Results ===`);
console.log(`Passed: ${passedCount}/${testCount}`);

if (passedCount === testCount) {
	console.log("✓ All tests passed!");
	process.exit(0);
} else {
	console.log(`✗ ${testCount - passedCount} test(s) failed`);
	process.exit(1);
}

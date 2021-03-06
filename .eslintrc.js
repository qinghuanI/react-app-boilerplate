module.exports = {
	root: true,
	env: {
		'jest/globals': true
	},
	extends: ['standard', 'plugin:react/recommended'],
	plugins: [
		'html',
		'react',
		'import',
		'jest',
		'simple-import-sort',
		'react-hooks'
	],
	parser: '@babel/eslint-parser',
	settings: {
		'import/resolver': {},
		react: {
			pragma: 'React', // Pragma to use, default to "React"
			fragment: 'Fragment', // Fragment to use (may be a property of <pragma>), default to "Fragment"
			version: 'detect', // React version. "detect" automatically picks the version you have installed.
			flowVersion: '0.53' // Flow version
		},
		jest: {
			version: 26
		}
	},
	parserOptions: {
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: true
		},
		sourceType: 'module'
	},
	rules: {
		// simple-import-sort
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					// Packages. `react` related packages come first.
					['^react', '^@?\\w'],
					// Internal packages.
					['^(@|@company|@ui|components|utils|config|vendored-lib)(/.*|$)'],
					// Side effect imports.
					['^\\u0000'],
					// Parent imports. Put `..` last.
					['^\\.\\.(?!/?$)', '^\\.\\./?$'],
					// Other relative imports. Put same-folder imports and `.` last.
					['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
					// Style imports.
					['^.+\\.s?css$']
				]
			}
		],
		camelcase: 0,
		'simple-import-sort/exports': 'error',

		// react
		'react/jsx-uses-react': 'error',
		'react/jsx-uses-vars': 'error',

		// import
		'import/no-unresolved': 0,
		'import/named': 2,
		'import/namespace': 2,
		'import/default': 2,
		'import/export': 2,

		// console
		'no-console': 2,
		'no-tabs': 0,
		indent: 0,
		'comma-dangle': ['error', 'never'],
		semi: ['error', 'always'],

		'react/react-in-jsx-scope': 'off',
		// allow jsx syntax in js files (for next.js project)
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }], // should add ".ts" if typescript project

		// jest
		'jest/no-disabled-tests': 'warn',
		'jest/no-focused-tests': 'error',
		'jest/no-identical-title': 'error',
		'jest/prefer-to-have-length': 'warn',
		'jest/valid-expect': 'error',

		// prop-types
		'react/prop-types': 2,

		// react-hooks
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn'
	},
	globals: {
		fetch: true,
		FormData: true,
		BASE_URL: true,
		T: true
	}
};

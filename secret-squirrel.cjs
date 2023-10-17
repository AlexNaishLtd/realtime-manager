module.exports = {
	files: {
		allow: [
			'.husky/pre-commit',
			'prisma/schema.prisma'
		],
		allowOverrides: []
	},
	strings: {
		deny: [],
		denyOverrides: [
			'joe@example\\.com', // src/modules/apps/create-form.tsx:46
			'heroicons/react/24/solid/CheckCircleIcon' // src/utils/toast.tsx:1
		]
	}
};

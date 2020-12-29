module.exports = {
    ci: {
        collect: {
            startServerCommand: "npm run start:lh",
            url: ["http://localhost:50000/products",
                "http://localhost:50000/checkout"]
        },
        assert: {
            assertions: {
                "categories:performance": ["warn", { minScore: 0.85 }],
                "categories:accessibility": ["error", { minScore: 0.95 }]
            }
        }
    }
};

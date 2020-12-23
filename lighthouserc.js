module.exports = {
    ci: {
        collect: {
            startServerCommand: "npm run start:50000",
            url: ["http://localhost:50000/products",
                "http://localhost:50000/checkout"]
        },
        assert: {
            preset: "lighthouse:no-pwa",
            assertions: {
                "categories:performance": ["error", { minScore: 0.9 }],
                "categories:accessibility": ["error", { minScore: 0.9 }]
            }
        }
    }
};

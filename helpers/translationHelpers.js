export function removeTranslationFromProduct(configProduct, language) {
    const miniShopDatabaseProduct = {
        productName: getStringByLanguage(configProduct.productName, language),
        price: configProduct.price,
        formFieldsToSave: [],
        fees: configProduct.fees,
        feeTotals: configProduct.feeTotals
    };
    for (const formFieldToSave of configProduct.formFieldsToSave ?? []) {
        miniShopDatabaseProduct.formFieldsToSave?.push({
            fieldName: getStringByLanguage(formFieldToSave.fieldName, language),
            formFieldName: formFieldToSave.formFieldName
        });
    }
    return miniShopDatabaseProduct;
}
export function getStringByLanguage(languageStringProperty, preferredLanguage) {
    if (languageStringProperty === undefined) {
        return undefined;
    }
    else if (typeof languageStringProperty === 'string') {
        return languageStringProperty;
    }
    else {
        return (languageStringProperty[preferredLanguage] ??
            languageStringProperty[Object.keys(languageStringProperty)[0]]);
    }
}
export const miniShopTranslations = {
    addToCart: {
        en: 'Add to Cart',
        fr: 'Ajouter au panier'
    },
    addedToCartSuccessfully: {
        en: 'Added to the cart successfully.',
        fr: 'Ajouté au panier avec succès.'
    },
    address: {
        en: 'Address',
        fr: 'Adresse'
    },
    cart: {
        en: 'Cart',
        fr: 'Panier'
    },
    checkout: {
        en: 'Checkout',
        fr: 'Paiement'
    },
    city: {
        en: 'City',
        fr: 'Ville'
    },
    clearCart: {
        en: 'Clear Cart',
        fr: 'Vider le panier'
    },
    continueShopping: {
        en: 'Continue Shopping',
        fr: 'Continuer mes achats'
    },
    country: {
        en: 'Country',
        fr: 'Pays'
    },
    daytimeTelephone: {
        en: 'Daytime Telephone Number',
        fr: 'Numéro de téléphone de jour'
    },
    emailAddress: {
        en: 'Email Address',
        fr: 'Adresse électronique'
    },
    emptyCart: {
        en: 'The cart is empty.',
        fr: 'Le panier est vide.'
    },
    eveningTelephone: {
        en: 'Evening Telephone Number',
        fr: 'Numéro de téléphone du soir'
    },
    item: {
        en: 'Item',
        fr: 'Objet'
    },
    itemTotal: {
        en: 'Item Total',
        fr: "Total de l'objet"
    },
    language: {
        en: 'Language',
        fr: 'Langue'
    },
    name: {
        en: 'Full Name',
        fr: 'Nom'
    },
    order: {
        en: 'Order',
        fr: 'Achat'
    },
    postalCode: {
        en: 'Postal Code',
        fr: 'Code postal'
    },
    price: {
        en: 'Price',
        fr: 'Prix'
    },
    proceedToCheckout: {
        en: 'Proceed to Checkout',
        fr: 'Passer à la caisse'
    },
    proceedToPayment: {
        en: 'Proceed to Payment',
        fr: 'Procéder au paiement'
    },
    productNotFound: {
        en: 'Product Not Found',
        fr: 'Produit introuvable'
    },
    province: {
        en: 'Province',
        fr: 'Province'
    },
    receipt: {
        en: 'Receipt',
        fr: 'Reçu'
    },
    removeFromCart: {
        en: 'Remove from Cart',
        fr: 'Retirer du panier'
    },
    returnToProducts: {
        en: 'Return to Products',
        fr: 'Retour aux produits'
    },
    total: {
        en: 'Total',
        fr: 'Total'
    },
    viewLargerPicture: {
        en: 'View Larger Picture',
        fr: 'Voir une image plus grande'
    }
};

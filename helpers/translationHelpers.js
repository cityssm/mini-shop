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
export function getTranslationStrings(translationStrings, preferredLanguage) {
    const result = {};
    for (const translationString of translationStrings) {
        result[translationString] =
            getStringByLanguage(miniShopTranslations[translationString], preferredLanguage) ?? '';
    }
    return result;
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
    cancel: {
        en: 'Cancel',
        fr: 'Résilier'
    },
    cart: {
        en: 'Cart',
        fr: 'Panier'
    },
    cartIsEmpty: {
        en: 'The cart is empty.',
        fr: 'Le panier est vide.'
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
    clearCartConfirm: {
        en: 'Are you sure you want to remove all items from your cart?',
        fr: 'Êtes-vous sûr de vouloir supprimer tous les articles de votre panier?'
    },
    clearCartOk: {
        en: 'Yes, Clear the Cart',
        fr: 'Oui, vider le panier'
    },
    contactIsRequired: {
        en: 'Contact information is required to deliver your order.',
        fr: 'Les coordonnées sont nécessaires pour livrer votre commande.'
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
    loading: {
        en: 'Loading'
    },
    name: {
        en: 'Full Name',
        fr: 'Nom'
    },
    order: {
        en: 'Order',
        fr: 'Achat'
    },
    orderExpired: {
        en: 'This order is no longer available.',
        fr: "Cette commande n'est plus disponible."
    },
    orderPrint: {
        en: 'Please print or archive the information below for your records.',
        fr: 'Veuillez imprimer ou archiver les informations ci-dessous pour vos dossiers.'
    },
    orderProcessed: {
        en: 'Your order has been processed successfully.',
        fr: 'Votre commande a été traitée avec succès.'
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
    removeFromCartConfirm: {
        en: 'Are you sure you want to remove this item from your cart?',
        fr: 'Êtes-vous sûr de vouloir supprimer cet article de votre panier?'
    },
    removeFromCartOk: {
        en: 'Yes, Remove Item',
        fr: "Oui, supprimer l'élément"
    },
    returnToProducts: {
        en: 'Return to Products',
        fr: 'Retour aux produits'
    },
    total: {
        en: 'Total',
        fr: 'Total'
    },
    tryAgain: {
        en: 'Try Again',
        fr: 'Essayer à nouveau'
    },
    viewLargerPicture: {
        en: 'View Larger Picture',
        fr: 'Voir une image plus grande'
    }
};

export default function AzureAD(options) {
    const { tenantId = "common", profilePhotoSize = 48, ...rest } = options;
    rest.issuer ?? (rest.issuer = `https://login.microsoftonline.com/${tenantId}/v2.0`);
    return {
        id: "azure-ad",
        name: "Azure Active Directory",
        type: "oidc",
        wellKnown: `${rest.issuer}}/.well-known/openid-configuration?appid=${options.clientId}`,
        async profile(profile, tokens) {
            // https://docs.microsoft.com/en-us/graph/api/profilephoto-get?view=graph-rest-1.0#examples
            const response = await fetch(`https://graph.microsoft.com/v1.0/me/photos/${profilePhotoSize}x${profilePhotoSize}/$value`, { headers: { Authorization: `Bearer ${tokens.access_token}` } });
            // Confirm that profile photo was returned
            let image;
            // TODO: Do this without Buffer
            if (response.ok && typeof Buffer !== "undefined") {
                try {
                    const pictureBuffer = await response.arrayBuffer();
                    const pictureBase64 = Buffer.from(pictureBuffer).toString("base64");
                    image = `data:image/jpeg;base64, ${pictureBase64}`;
                }
                catch { }
            }
            return {
                id: profile.sub,
                name: profile.name,
                email: profile.email,
                image: image ?? null,
            };
        },
        style: {
            logo: "/azure.svg",
            logoDark: "/azure-dark.svg",
            bg: "#fff",
            text: "#0072c6",
            bgDark: "#0072c6",
            textDark: "#fff",
        },
        options: rest,
    };
}

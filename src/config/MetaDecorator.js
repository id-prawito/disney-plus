import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const MetaDecorator = ({ title, description, imageUrl }) => {
    return (
        <HelmetProvider>
            <Helmet>
                <meta charSet="utf-8" />

                {/* Primary Meta Tags */}
                <title>{title}</title>
                <meta name="title" content={title} />
                <meta name="description" content={description} />

                {/* Open Graph / Facebook Meta Tags */}
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={imageUrl} />
                <meta
                    property="og:url"
                    content={
                        "https://id-prawito.github.io" +
                        window.location.pathname +
                        window.location.search
                    }
                />

                {/* Twitter Meta Tags */}
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content={description} />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:image" content={imageUrl} />
                <meta
                    property="twitter:url"
                    content={
                        "https://id-prawito.github.io" +
                        window.location.pathname +
                        window.location.search
                    }
                />
            </Helmet>
        </HelmetProvider>
    );
};

MetaDecorator.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
};

export default MetaDecorator;

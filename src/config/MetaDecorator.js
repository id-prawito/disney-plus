import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const MetaDecorator = ({ title, description, imageUrl }) => {
    return (
        <HelmetProvider>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={imageUrl} />
                <meta
                    property="og:url"
                    content={window.location.pathname + window.location.search}
                />
                <meta name="twitter:card" content="summary_large_image" />
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

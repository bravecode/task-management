import React from 'react';
import { Helmet } from 'react-helmet';

const Head: React.FC = () => (
    <Helmet>
        <title>
            Task Management
        </title>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap" rel="stylesheet" />
    </Helmet>
);

export default Head;

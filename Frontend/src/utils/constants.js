export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        GETME: "/auth/me",
    },
    SESSION: {
        CREATE: "/session/create",
        JOIN: '/session/join',
        END: '/session/end',
        LEAVE: '/session/leave',
        GET: "/session/get",
        LIST: '/session/list'
    },
    VIDEO: {
        CALL: "/video/call",
    }
}

export const APP_CONFIG = {
    APP_NAME: 'Live Classes',
    APP_DESCRIPTION: 'Online Classes',
    APP_TAGLINE: 'Connect,Learn,Grow Together',

    SOCIAL_LINKS: {
        YOUTUBE: 'https://www.youtube.com/',
        TWITTER: 'https://twitter.com/',
        INSTAGRAM: 'https://www.instagram.com/',
        FACEBOOK: 'https://www.facebook.com/',
    },
    FOOTER_LINKS: {
        ABOUT: '/about',
        CONTACT: '/contact',
        FAQ: '/faq',
        PRIVACY_POLICY: '/privacy-policy',
        TERMS_AND_CONDITIONS: '/terms-and-conditions',
    },

    FEATURES: [
        {
            icon: 'FaVideo',
            title: 'High Quality Video',
            description: 'Zego SDK provides high quality video streaming',
        },
        {
            icon: 'FaComments',
            title: 'Built-in Chat',
            description: 'Chat with your students and peers in real-time',
        },
        {
            icon: 'FaDesktop',
            title: 'Screen Sharing',
            description: 'Share your screen with your students',
        },
        {
            icon: 'FaUsers',
            title: 'Group Sessions',
            description: 'Host and join collaborative group sessions',
        },
        {
            icon: 'FaLock',
            title: 'Secure Sessions',
            description: 'End-to-end encrypted sessions for privacy',
        },
    ],

    // Dashboard Content
    DASHBOARD_CONTENT: {
        ACTION_CARDS: {
            HOST: {
                BUTTON: 'Create Session',
                BUTTON_LOADING: 'Creating...',
            },
            JOIN: {
                TITLE: 'Join a Session',
                DESCRIPTION: 'Enter a room ID to join an existing live session',
                BUTTON: 'Join Session',
            },
        },
        SESSIONS_LIST: {
            HEADING: 'Your Sessions',
            DESCRIPTION: 'Active and past sessions you hosted or joined',
            LOADING: 'Loading sessions...',
            EMPTY: 'No sessions yet.',
            FILTER_ALL: 'All',
            FILTER_ACTIVE: 'Active',
        },
    },

    // Auth Content
    AUTH_CONTENT: {
        LOGIN: {
            HEADING: 'Welcome Back',
            DESCRIPTION: 'Sign in to continue to your account',
        },
        REGISTER: {
            HEADING: 'Create Account',
            DESCRIPTION: 'Sign up to start hosting and joining live sessions',
        },
    },

    // Loading Messages
    LOADING_MESSAGES: {
        SESSION: 'Loading session...',
        SESSIONS: 'Loading sessions...',
        GENERAL: 'Loading...',
    },
}

export const ZEGO_CONFIG = {
    APP_ID: process.env.REACT_APP_ZEGO_APP_ID,
    APP_SECRET: process.env.REACT_APP_ZEGO_SERVER_SECRET,
}

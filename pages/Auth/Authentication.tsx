import React from 'react';

function Authentication({isLogin}: {isLogin: boolean}) {
    return (
        <div>
            {isLogin ? 'Login' : 'Register'}
        </div>
    );
}

export default Authentication;
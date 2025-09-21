import { Spinner } from '@heroui/spinner';
import React from 'react';

const Loading = () => {
    return (
        <>
            <div className="h-dvh flex justify-center items-center">
                <Spinner size="lg" color="success" />
            </div>
        </>
    );
}

export default Loading;

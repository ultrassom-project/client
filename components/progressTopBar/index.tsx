import React, { useEffect, useState } from 'react';
import { useReconstructions } from '../../hooks/reconstructions';
import { Container, GrowingBar } from './styles';

const ProgressTopBar: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const { randomSubmitTimeInterval, runningRandomSubmit } = useReconstructions();

    useEffect(() => {
        if (!runningRandomSubmit) {
            return;
        }

        const increaser = async () => {
            const progressIncrease = 100 / randomSubmitTimeInterval;
            let auxProgress = 0;
            let done = false;
            setTimeout(() => {
                done = true;
            }, randomSubmitTimeInterval * 1000);

            while (!done) {
                auxProgress += progressIncrease;
                setProgress(auxProgress);
                await new Promise((res) => setTimeout(() => res(''), 1000));
            }
        };

        increaser();
    }, [randomSubmitTimeInterval, runningRandomSubmit]);

    return (
        <Container>
            <GrowingBar progress={progress} />
        </Container>
    );
};

export default ProgressTopBar;

import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
	const [steps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	let start = activeIndex === 0 ? true : false;
	let end = activeIndex === steps.length - 1 ? true : false;
	const classesActive = styles['steps-item'] + ' ' + styles.done + ' ' + styles.active;
	const classesCurrent = styles['steps-item'] + ' ' + styles.done;
	const classes = styles['steps-item'];

	const getActiveIndex = (index) => {
		setActiveIndex(index);
	};

	const handleClickNext = () => {
		setActiveIndex((prevActiveIndex) => prevActiveIndex + 1);
	};

	const handleClickBack = () => {
		if (activeIndex > 0) {
			setActiveIndex((prevActiveIndex) => prevActiveIndex - 1);
		}
	};

	const handleClickStartAgain = () => {
		setActiveIndex(0);
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>{steps[activeIndex].content}</div>
					<ul className={styles['steps-list']}>
						{steps.map(({ id, title }, index) => (
							<li
								className={
									index === activeIndex
										? classesActive
										: index < activeIndex
											? classesCurrent
											: classes
								}
								key={id}
							>
								<button
									className={styles['steps-item-button']}
									onClick={() => getActiveIndex(index)}
								>
									{index + 1}
								</button>
								{title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button className={styles.button} disabled={start} onClick={handleClickBack}>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={!end ? handleClickNext : handleClickStartAgain}
						>
							{!end ? 'Далее' : 'Начать сначала'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

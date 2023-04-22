export const dateFinder = (): string => {
	const date = new Date();
	const dayOfWeekName = date.toLocaleString('default', {
		weekday: 'long',
	});
	const getDate = date.getDate();

	const getMonth = date.toLocaleString('default', { month: 'long' });

	return `${dayOfWeekName} ${getDate} ${getMonth}`;
};

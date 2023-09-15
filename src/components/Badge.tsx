import styles from "./Badge.module.css";

type Props = {
	isNew?: boolean;
	show: boolean;
	value: string;
};

export default function Badge({ isNew, show, value }: Props) {
	const isNewClassName = isNew
		? `${styles.feature} ${styles.new}`
		: styles.feature;

	if (!show) return null;

	return <span className={isNewClassName}>{value}</span>;
}

Badge.defaultProps = {
	isNew: false,
};

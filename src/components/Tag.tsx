import styles from "./Tag.module.css";

type Props = {
	value: string;
	canClose: boolean;
	handleAdd?: () => void;
	handleRemove?: () => void;
};

export default function Tag({
	value,
	canClose,
	handleAdd,
	handleRemove,
}: Props) {
	return (
		<div className={styles.tag}>
			<button onClick={handleAdd} className={styles.button} type="button">
				{value}
			</button>
			{canClose && (
				<button onClick={handleRemove} type="button" className={styles.close}>
					&times;
				</button>
			)}
		</div>
	);
}

Tag.defaultProps = {
	canClose: false,
	handleAdd: () => {},
	handleRemove: () => {},
};

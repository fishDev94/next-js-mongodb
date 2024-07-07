import styles from "./users-list.module.scss";

export default function UsersList({ users = [], handleSelect = () => {} }) {
  return (
    <ul className={styles.usersList}>
      {users.map((user, idx) => (
        <li onClick={() => handleSelect(user._id)} key={idx}>
          {user.userName} - <span>{user._id}</span>
        </li>
      ))}
    </ul>
  );
}

import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

import { useUpdateCommentCountMutation } from "../../redux/commentApi";

export const Button = ({ children, counter, role = "thumbsUp", id }) => {
  const [updateCommentCount, { isLoading }] = useUpdateCommentCountMutation();

  const variants = {
    [styles.thumbsUp]: role === "thumbsUp",
    [styles.thumbsDown]: role === "thumbsDown",
  };

  const handleThumb = async () => {
    try {
      await updateCommentCount({
        id,
        [role]: ++counter,
      });
    } catch (error) {}
  };

  return (
    <button
      className={classNames(styles.button, variants)}
      type="button"
      counter={counter}
      onClick={handleThumb}
      id={id}
    >
      {children}

      <span className={styles.counter}>
        <span
          className={classNames({
            [styles.ping]: isLoading,
          })}
        />

        {counter}
      </span>
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  counter: PropTypes.number.isRequired,
  role: PropTypes.string,
  id: PropTypes.string.isRequired,
};

function Dialog({ message, handleCloseDialog }) {
  return (
    <div className="warningDialog">
      <h2>Alert</h2>
      <p>{message}</p>
      <button onClick={handleCloseDialog}>Dismiss</button>
    </div>
  );
}

export default Dialog;

import styles from "../../styles/Admin.module.css";

export default function OrderRow({orderList}){
    return(
        <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.slice(0, 5)}...</td>
                  <td>{order.customer_name}</td>
                  <td>${order.total}</td>
                  <td>
                    {order.method === 0 ? (
                      <span>Cash</span>
                    ) : (
                      <span>Paid on Paypal</span>
                    )}
                  </td>
                  <td>{status[order.status]}</td>
                  <td>
                    <button
                      className={styles.button}
                      onClick={() => handleStatus(order._id)}
                    >
                      Next Stage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    );
}
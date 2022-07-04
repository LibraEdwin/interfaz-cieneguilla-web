const TableClient = ({ clients, handleOnClick }) => {
  return (
    <>
      <div className="table__wrapper">
        <table className="table">
          <thead className="thead">
            <tr>
              <th>DNI</th>
              <th>Nombre del comprador</th>
              <th>Correo</th>
              <th>Fecha/hora registro</th>
              <th>Número de celular</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="tbody">
            {clients.map(client => (
              <tr key={client._id}>
                <td>{client._id}</td>
                <td>{client.nombre}</td>
                <td>{client.correo}</td>
                <td>{client.createdAt}</td>
                <td>{client.celular}</td>
                <td>
                  <button
                    className="button-table not-print"
                    onClick={() => handleOnClick(client)}
                  > <img src="/icons/password.png" alt="" /> </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .table__wrapper {
          border: 1px solid rgba(0,0,0,0.2);
          padding: 0 1rem 1rem;
          border-radius: 0.35rem;
          margin-top: 2rem;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
        }
        .thead th {
          padding: 1.25rem 0;
        }
        .tbody td {
          text-align: center;
          border-top: 1px solid rgba(0,0,0,0.2);
        }
        .button-table {
          border-style: none;
          background: transparent;
          cursor: pointer;
        }
      `}</style>
    </>
  )
}

export default TableClient
import { Navbar } from "../../../components/navbar/Navbar";
import { apiBase } from "../../../services/api";
import { useEffect } from "react";
export function OrganizacaoPage() {
  async function hello(){
    const response = apiBase.get("/participantes")
    return response
  }

  useEffect(() => {
    hello().then((response) => {
      console.log(response)
    })
  },[])
  return (
    <>
      <Navbar title="Dashboard" typeUser="Organização"  />
      Organização
    </>
  );
}

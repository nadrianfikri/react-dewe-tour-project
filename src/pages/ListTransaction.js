import { Table, THeader, TBody, TData2 } from '../components/Table';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
function ListTransaction() {
  return (
    <div className="pt-36 bg-gray-100 ">
      <Navbar class="bg-navbar" />
      <main className="md:container mx-auto overflow-auto pb-36">
        <h1 className="text-4xl font-bold pb-10">Incoming Transaction</h1>
        <section className="flex flex-col overflow-auto bg-white">
          <Table>
            <THeader col1="No" col2="Users" col3="Trip" col4="Bukti Transfer" col5="Status Payment" col6="Action" />
            <TBody>
              <TData2 no="1" user="Nadrian" trip="6D/4N Fun Tassie Vacation" proofTF="bca.jpg" status="Pending" statusStyle="text-yellow-400" />
              <TData2 no="2" user="Nadrian" trip="6D/4N Fun Tassie Vacation" proofTF="bca.jpg" status="Approve" statusStyle="text-green-400" />
            </TBody>
          </Table>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default ListTransaction;

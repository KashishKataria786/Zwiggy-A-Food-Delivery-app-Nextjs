import CustomerHeader from '../_ui/_customer_ui/CustomerHeader'
import CustomerFooter from '../_ui/_customer_ui/CustomerFooter'

const CustomerLayout = ({children}) => {
  return (
    <>
    <CustomerHeader/>
    <main className='min-h-[70vh]'>
        {children}
    </main>
    <CustomerFooter/>
    </>
  )
}

export default CustomerLayout

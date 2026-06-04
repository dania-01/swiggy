import { CartProvider } from "@/context/CartContext";
import { LocationProvider } from "@/context/LocationContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata = {
  title: {
    default: "Order Food Online from India's Best Food Delivery Service | Swiggy",
    template: "%s | Swiggy",
  },
  description: "Order food online from India's best restaurants. Fast delivery, great discounts on 90+ restaurants near you.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white" style={{ fontFamily: "'Gilroy', Arial, 'Helvetica Neue', sans-serif" }}>
        <LocationProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </LocationProvider>
      </body>
    </html>
  );
}

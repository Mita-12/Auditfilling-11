// import React from 'react';

// const Contact = () => {
//   return (
//     <section className="py-16 px-8 bg-gray-50">
//       <div className="max-w-screen-xl mx-auto">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold text-gray-800 mb-4">
//             Connect With PrimeNotary For Fast Legal Assistance
//           </h2>
//           <p className="text-lg text-gray-600">
//             You can easily reach us through phone or email for any notary or legal inquiries. Our dedicated team is always ready to provide quick and reliable assistance whenever you need it.
//           </p>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           <div className="bg-white shadow-lg rounded-lg p-6">
//             <div className="flex items-center justify-center mb-4">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 2a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800">Head Office</h3>
//             <p className="text-gray-600">Jln Cempaka Wangi No 22, Jakarta - Indonesia</p>
//           </div>

//           <div className="bg-white shadow-lg rounded-lg p-6">
//             <div className="flex items-center justify-center mb-4">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                 <path d="M2 2a2 2 0 012-2h12a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V2z" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800">Let's Talk</h3>
//             <p className="text-gray-600">Phone: +6221.2002.2012</p>
//             <p className="text-gray-600">Fax: +6221.2002.2013</p>
//           </div>

//           <div className="bg-white shadow-lg rounded-lg p-6">
//             <div className="flex items-center justify-center mb-4">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                 <path d="M2 2a2 2 0 012-2h12a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V2z" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800">Email Support</h3>
//             <p className="text-gray-600">support@yourdomain.tld</p>
//             <p className="text-gray-600">hello@yourdomain.tld</p>
//           </div>

//           <div className="bg-white shadow-lg rounded-lg p-6">
//             <div className="flex items-center justify-center mb-4">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                 <path fillRule="evenodd" d="M5.23 2.46a7.538 7.538 0 0110.04 0A7.538 7.538 0 0118.54 5.77a7.535 7.535 0 010 10.04 7.537 7.537 0 01-3.27 3.27c-.52.26-1.06.46-1.61.67-.48-.47-.96-.95-1.43-1.42a6.543 6.543 0 00-8.19 0c-.48.47-.96.95-1.43 1.42a6.545 6.545 0 01-1.61-.67A7.537 7.537 0 012.46 5.77a7.538 7.538 0 011.77-3.31zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800">Office Hour</h3>
//             <p className="text-gray-600">Monday - Friday</p>
//             <p className="text-gray-600">9:00 AM to 6:00 PM</p>
//           </div>
//         </div>

//         <div className="text-center mt-8">
//           <button className="bg-orange-500 text-white px-6 py-2 rounded-lg mr-4">
//             Live Chat
//           </button>
//           <button className="bg-transparent text-orange-500 border-2 border-orange-500 px-6 py-2 rounded-lg">
//             Discover more
//           </button>
//         </div>

//         <div className="text-center mt-8">
//           <p className="text-gray-600">Follow Our Social Media:</p>
//           <div className="flex justify-center space-x-4 mt-2">
//             <a href="#" className="text-gray-600 hover:text-orange-500">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path d="M12 2a10 10 0 1 1-10 10A10 10 0 0 1 12 2zm-1 15V9h2v8h-2zm-1-9h4V6h-4z" />
//               </svg>
//             </a>
//             <a href="#" className="text-gray-600 hover:text-orange-500">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path d="M22 12a10 10 0 1 0-10 10 10 10 0 0 0 10-10zM12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20zm3 5h2v4h-2V7zm-4 0h2v4h-2V7z" />
//               </svg>
//             </a>
//             <a href="#" className="text-gray-600 hover:text-orange-500">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm1 13h-2v-4h2zm-1-6c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
//               </svg>
//             </a>
//             <a href="#" className="text-gray-600 hover:text-orange-500">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                 <path d="M2 4h3v16H2zm18 0h3v16h-3z" />
//               </svg>
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Contact;

export const loadRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};

export const createRazorpayOrder = async (amount, currency = 'INR') => {
    try {
        // Replace with your actual backend API endpoint
        const response = await fetch('https://your-backend.com/api/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: amount * 100, // Razorpay expects amount in paise
                currency: currency,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create order');
        }

        const order = await response.json();
        return order;
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        throw error;
    }
};
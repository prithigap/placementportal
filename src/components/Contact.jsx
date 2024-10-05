import './Contact.css'
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';

const Contact = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        try {
            const templateParams = {
                from_name: data.name,
                email: data.email,
                phone: data.phone,
                message: data.feedback,
            };

            const response = await emailjs.send(
                'service_raib9yj',      // Replace with your EmailJS service ID
                'template_btwqkwo',     // Replace with your EmailJS template ID
                templateParams,
                'LwvHN7TmFX1vJKKdO'          // Replace with your EmailJS user ID
            );

            if (response.status === 200) {
                toast.success('🎉 Form Submitted and Email Sent!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                reset();  // Reset the form after successful submission
            }
        } catch (error) {
            console.log('Error sending email:', error);
            toast.error('😞 Failed to send the email. Try again!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    return (
        <div>
            <section className="banner">
                <h1>Get in Touch With Us</h1>
                <p>We are here to answer any questions you may have.</p>
            </section>

            <section className="contact-form">
                <div className="form-container">
                    <h2>Your Details</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputName" className="form-label">Name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                id="exampleInputName"
                                placeholder="John Doe"
                                {...register('name', {
                                    required: 'Name is required'
                                })}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                id="exampleInputEmail1"
                                placeholder="example123@example.com"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: 'Invalid email format'
                                    }
                                })}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputPhone" className="form-label">Phone Number</label>
                            <input
                                type="tel"
                                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                id="exampleInputPhone"
                                placeholder="1234567890"
                                {...register('phone', {
                                    required: 'Phone number is required'
                                })}
                            />
                            {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputFeedback" className="form-label">Feedback</label>
                            <textarea
                                className={`form-control ${errors.feedback ? 'is-invalid' : ''}`}
                                id="exampleInputFeedback"
                                rows="4"
                                placeholder="Your feedback here..."
                                {...register('feedback', {
                                    required: 'Feedback is required'
                                })}
                            ></textarea>
                            {errors.feedback && <div className="invalid-feedback">{errors.feedback.message}</div>}
                        </div>

                        <button type="submit" disabled={isSubmitting} className="btn btn-success m-2">{isSubmitting ? 'Submitting' : 'Submit'}</button>
                    </form>

                </div>
            </section>
        </div>
    )
}

export default Contact;

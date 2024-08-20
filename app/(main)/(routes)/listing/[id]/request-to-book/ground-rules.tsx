export const GroundRules = () => {
  return (
    <>
      <div className="mb-7 mt-7 flex flex-col gap-2">
        <h2 className="mb-2 text-lg font-semibold">Ground rules</h2>{" "}
        <p>
          We ask every guest to remember a few simple things about what makes a
          great guest.
        </p>
        <ul className="custom-bullet pl-5">
          <li>Follow the house rules</li>
          <li>Treat your Host&apos;s home like your own</li>
        </ul>
      </div>
      <hr />
      <p className="mb-7 mt-7 text-sm">
        By selecting the button below, I agree to the Host&apos;s House Rules,
        Ground rules for guests, Airbnb&apos;s Rebooking and Refund Policy, and
        that Airbnb can charge my payment method if I&apos;m responsible for
        damage.
      </p>
    </>
  );
};

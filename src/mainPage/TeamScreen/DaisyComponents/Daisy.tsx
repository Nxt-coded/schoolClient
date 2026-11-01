const Daisy = () => {
  return (
    <div>
      <div className="mt-[50px]">
        <div className="flex justify-center">
          {/* Daisy */}
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Total Page Views</div>
              <div className="stat-value">89,400</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
            {/* Daisy ends */}
          </div>
        </div>

        <div className="flex justify-center">
          {/* Daisy */}
          <progress
            className="progress w-56 m-[10px]"
            value={0}
            max="100"
          ></progress>
          <progress
            className="progress w-56 m-[10px]"
            value="10"
            max="100"
          ></progress>
          <progress
            className="progress w-56 m-[10px]"
            value="40"
            max="100"
          ></progress>
          <progress
            className="progress w-56 m-[10px]"
            value="70"
            max="100"
          ></progress>
          <progress
            className="progress w-56 m-[10px]"
            value="100"
            max="100"
          ></progress>
          <progress className="progress w-56 m-[10px]"></progress>
          {/* Daisy ends */}
        </div>

        <div className="flex justify-center">
          {/* Daisy */}
          <div>Hello</div>
          {/* Daisy ends */}
        </div>
      </div>
    </div>
  );
};

export default Daisy;

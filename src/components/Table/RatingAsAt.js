import React from 'react';

export const HistoricalRating = ({ data, ratingHandleChange, flag }) => (
  <div>
    <h4>Choosing currencies are as at</h4>
    <form>
      <section>
        <label htmlFor="dateFrom" text="date">From date</label>
        <br />
        <input
          type="date"
          id="dateFrom"
          flag
          defaultValue="Currency from"
          className="form-control-currency-from"
          onChange={e => ratingHandleChange(e)}
        />
      </section>
      <section>
        <label htmlFor="date" text="date">Till date</label>
        <br />
        <input
          type="date"
          id="date"
          flag="false"
          defaultValue={data}
          className="orm-control-currency-from"
          onChange={e => ratingHandleChange(e, flag)}
        />
      </section>
    </form>
  </div>
);

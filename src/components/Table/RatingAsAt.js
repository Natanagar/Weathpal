import React from 'react';

export const HistoricalRating = ({ data, ratingHandleChange, flag }) => {
  console.log(flag)
  const InputDate = ({ flag, ratingHandleChange }) => {
    return(
      <section>
				<label htmlFor="dateFrom" text="date"/>
				<br />
				<input
					type="date"
          id="dateFrom"
					flag={flag}
					defaultValue="Currency from"
					className="form-control-currency-from"
					onChange={(e) => ratingHandleChange(e, flag)}
				/>
			</section>
    )
  }
  return(
    <div>
		<h4>Choosing currencies are as at</h4>
		<form>
      <h4>Historical rating</h4>
      <InputDate  flag defaultValue={"Currency from"} ratingHandleChange={ratingHandleChange}/>
			<InputDate  flag={false} defaultValue={"Currency till"} ratingHandleChange={ratingHandleChange}/>
			
		</form>
	</div>
  )};

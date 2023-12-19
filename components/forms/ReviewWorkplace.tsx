const ReviewWorkplace = () => {
  return (
    <div>
      <h1>Add a review to a workplace</h1>
      {/* <Controller
          name='workplaceRating'
          control={control}
          render={({ field }) => (
            <Flex direction='column' gap='4' style={{ maxWidth: 300 }}>
              <label>Workplace Rating: {field.value}</label>
              <Slider
                value={[field.value]}
                onValueChange={field.onChange}
                defaultValue={[4]}
                min={1}
                max={5}
                color='crimson'
              />
            </Flex>
          )}
        />
        <Controller
          name='foodRating'
          control={control}
          render={({ field }) => (
            <Flex direction='column' gap='4' style={{ maxWidth: 300 }}>
              <label>Food Rating: {field.value}</label>
              <Slider
                value={[field.value]}
                onValueChange={field.onChange}
                defaultValue={[3]}
                min={1}
                max={5}
                color='crimson'
              />
            </Flex>
          )}
        /> */}

      {/* <Controller
          name='comments'
          control={control}
          render={({ field }) => (
            <TextArea
              value={field.value}
              onChange={field.onChange}
              placeholder='Your comment here'
            />
          )}
        /> */}
    </div>
  );
};

export default ReviewWorkplace;

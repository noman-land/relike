status.addListener('init', function(params, context) {
  status.sendMessage('Hello, man!');
  return;
});

status.addListener('on-message-send', function(params, context) {
  const result = {
    err: null,
    data: null,
    messages: [],
  };

  try {
    result['text-message'] = "You're amazing, master!";
  } catch (e) {
    result.err = e;
  }
  console.log('test');
  return result;
});

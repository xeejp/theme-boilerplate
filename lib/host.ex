defmodule YourApplication.Host do
  def get_filter(data) do
    %{
      _default: true,
      participants_number: "participantsNumber"
    }
  end

  def filter_data(data) do
    Transmap.transform(data, get_filter(data), diff: false)
  end

  def filter_diff(data, diff) do
    Transmap.transform(diff, get_filter(data), diff: true)
  end
end

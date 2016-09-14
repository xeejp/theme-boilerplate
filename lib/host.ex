defmodule YourApplication.Host do
  def filter_data(data, diff: diff) do
    map = %{
      _default: true,
      participants_number: "participantsNumber"
    }
    Transmap.transform(data, map, diff: diff)
  end
end

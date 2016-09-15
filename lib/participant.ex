defmodule YourApplication.Participant do
  def get_filter(data, id) do
    %{
      participants: %{
        id => true
      },
      participants_number: "participantsNumber",
      _spread: [[:participants, id]]
    }
  end

  def filter_data(data, id) do
    Transmap.transform(data, get_filter(data, id), diff: false)
    |> Map.delete(:participants)
  end
end


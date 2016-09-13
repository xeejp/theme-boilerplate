defmodule YourApplication.Participant do
  alias YourApplication.Main

  def filter_data(data, id) do
    map = %{
      participants: %{
        id => true
      },
      participants_number: "participantsNumber",
      _spread: [[:participants, id]]
    }
    Main.filter_data(data, map)
  end
end


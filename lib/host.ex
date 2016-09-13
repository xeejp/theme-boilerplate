defmodule YourApplication.Host do
  alias YourApplication.Main

  def filter_data(data) do
    map = %{
      _default: true,
      participants_number: "participantsNumber"
    }
    Main.filter_data(data, map)
  end
end

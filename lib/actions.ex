defmodule YourApplication.Actions do
  alias YourApplication.Participant
  alias YourApplication.Host

  def update_host_contents(data) do
    host = get_action("update contents", Host.filter_data(data))
    format(data, host)
  end

  def update_participant_contents(data, id) do
    participant = dispatch_to(id, get_action("update contents", Participant.filter_data(data, id)))
    format(data, nil, participant)
  end

  # Utilities

  defp get_action(type, params) do
    %{
      type: type,
      payload: params
    }
  end

  defp dispatch_to(map \\ %{}, id, action) do
    Map.put(map, id, %{action: action})
  end

  defp dispatch_to_all(%{participants: participants}, action) do
    Enum.reduce(participants, %{}, fn {id, _}, acc -> dispatch_to(acc, id, action) end)
  end

  defp format(data, host, participants \\ nil) do
    result = %{data: data}
    result = unless is_nil(host) do
      Map.put(result, :host, %{action: host})
    else
      result
    end
    result = unless is_nil(participants) do
      Map.put(result, :participant, participants)
    else
      result
    end
    {:ok, result}
  end
end

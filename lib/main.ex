defmodule YourApplication.Main do
  alias YourApplication.Host
  alias YourApplication.Participant

  @default_key :_default
  @spread_key :_spread

  def init do
    %{
      participants: %{},
      participants_number: 0,
    }
  end

  def new_participant do
    %{
      id: nil
    }
  end

  def join(data, id) do
    unless Map.has_key?(data.participants, id) do
      new = new_participant()
      data
      |> put_in([:participants, id], new)
      |> Map.update!(:participants_number, fn n -> n + 1 end)
    else
      data
    end
  end

  def compute_diff(old, %{data: new} = result) do
    host = Map.get(result, :host, %{})
    participant = Map.get(result, :participant, %{})
    diff = JsonDiffEx.diff(old, new)
    participant_tasks = Enum.map(old.participants, fn {id, _} ->
      {id, Task.async(fn -> Participant.filter_data(diff, id) end)}
    end)
    host_task = Task.async(fn -> Host.filter_data(diff) end)
    host_diff = Task.await(host_task)
    participant_diff = Enum.map(participant_tasks, fn {id, task} -> {id, %{diff: Task.await(task)}} end)
                        |> Enum.filter(fn {_, map} -> map_size(map.diff) != 0 end)
                        |> Enum.into(%{})
    host = Map.merge(host, %{diff: host_diff})
    host = if map_size(host.diff) == 0 do
      Map.delete(host, :diff)
    else
      host
    end
    host = if map_size(host) == 0 do
      nil
    else
      host
    end
    participant = Map.merge(participant, participant_diff, fn _k, v1, v2 ->
      Map.merge(v1, v2)
    end)
    %{data: new, host: host, participant: participant}
  end

  def filter_data(data, true), do: data
  def filter_data(data, _) when not is_map(data), do: data
  def filter_data(data, rule) when is_map(data) do
    default = Map.get(rule, @default_key, false)
    spread = Map.get(rule, @spread_key, [])
    {data, rule} = apply_spread(data, rule, spread)
    data = Enum.reduce(data, %{}, fn {id, value}, result ->
      {id, rule_value} = case Map.get(rule, id, default) do
        string when is_binary(string) -> {string, true}
        {id, rule_value} -> {id, rule_value}
        rule_value -> {id, rule_value}
      end
      if rule_value != false do
        filtered = filter_data(value, rule_value)
        case filtered do
          map when is_map(map) and map_size(map) == 0 -> result
          other -> Map.put(result, id, other)
        end
      else
        result
      end
    end)
  end

  defp apply_spread(data, rule, spread) do
    {data, rule} = Enum.reduce(spread, {data, rule}, fn keys, {data, rule} ->
      {data_map, data} = pop_in(data, keys)
      {rule_map, rule} = pop_in(rule, keys)
      if is_map(data_map) do
        data = Map.merge(data, data_map)
        rule = if is_map(rule_map) do
          Map.merge(rule, rule_map)
        else
          rule_map = for {key, value} <- data_map, into: %{}, do: {key, true}
          Map.merge(rule, rule_map)
        end
        {data, rule}
      else
        {data, rule}
      end
    end)
  end
end
